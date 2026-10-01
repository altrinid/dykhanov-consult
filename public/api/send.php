<?php
/**
 * Обработчик формы заявки.
 *
 * Работает на любом хостинге с PHP 7.4+ и функцией mail().
 * Настройки по умолчанию — ниже в DEFAULTS. Переопределить их можно файлом
 * form-config.php уровнем выше корня сайта (см. form-config.example.php и README).
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Kaliningrad');

const DEFAULTS = [
    'to'          => 'g.dykhanov@kccbe.ru',
    'from'        => 'noreply@dykhanov-consult.ru',
    'site_name'   => 'dykhanov-consult.ru',
    'phone'       => '+7 (911) 459-14-88',
    // Минимальное время от открытия страницы до отправки (мс): быстрее отправляют только боты
    'min_elapsed' => 1500,
    // Путь к журналу заявок (JSON Lines) вне корня сайта. Пусто — журнал не ведётся.
    'log_file'    => '',
];

function load_config(): array
{
    $candidates = [
        getenv('DC_FORM_CONFIG') ?: '',
        dirname(__DIR__, 2) . '/form-config.php',
    ];

    foreach ($candidates as $file) {
        if ($file !== '' && is_file($file)) {
            $custom = require $file;
            if (is_array($custom)) {
                return array_merge(DEFAULTS, $custom);
            }
        }
    }

    return DEFAULTS;
}

function wants_json(): bool
{
    return strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
}

function respond(bool $ok, string $message, int $status): void
{
    if (wants_json()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? '/thanks/' : '/form-error/'), true, 303);
    }
    exit;
}

/** Значение поля без управляющих символов; однострочные поля — без переводов строк */
function field(string $key, int $maxLength, bool $multiline = false): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }

    $value = (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    $value = $multiline
        ? (string) preg_replace('/\r\n?/', "\n", $value)
        : (string) preg_replace('/\s+/u', ' ', $value);

    return mb_substr(trim($value), 0, $maxLength);
}

function mime_header(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Метод не поддерживается.', 405);
}

$config = load_config();
$thanks = 'Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.';

// Ловушка для ботов: делаем вид, что всё в порядке, но письмо не отправляем
if (field('website', 200) !== '') {
    respond(true, $thanks, 200);
}

// Слишком быстрая отправка. Поле заполняет скрипт формы; без JS его нет — тогда проверку пропускаем.
// Не притворяемся, что всё отправлено: если это был человек, он просто отправит форму ещё раз.
$elapsed = field('elapsed', 12);
if ($elapsed !== '' && (int) $elapsed < (int) $config['min_elapsed']) {
    respond(false, 'Форма отправлена слишком быстро. Пожалуйста, отправьте её ещё раз.', 429);
}

$name    = field('name', 100);
$phone   = field('phone', 30);
$email   = field('email', 120);
$message = field('message', 2000, true);
$page    = field('page', 200);
$consent = ($_POST['consent'] ?? '') === 'yes';

$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'укажите имя';
}
$digits = (string) preg_replace('/\D+/', '', $phone);
if (strlen($digits) < 10 || strlen($digits) > 15) {
    $errors[] = 'укажите телефон полностью';
}
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = 'проверьте e-mail';
}
if (!$consent) {
    $errors[] = 'отметьте согласие на обработку персональных данных';
}
if ($errors) {
    $text = implode(', ', $errors);
    respond(false, 'Пожалуйста, ' . $text . '.', 422);
}

$receivedAt = date('d.m.Y H:i');
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

$body = implode("\r\n", [
    'Новая заявка с сайта ' . $config['site_name'],
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'E-mail: ' . ($email !== '' ? $email : '—'),
    'Страница: ' . ($page !== '' ? $page : '—'),
    '',
    'Сообщение:',
    $message !== '' ? str_replace("\n", "\r\n", $message) : '—',
    '',
    '---',
    'Согласие на обработку персональных данных получено ' . $receivedAt . ($ip !== '' ? ', IP ' . $ip : ''),
]);

$headers = [
    'From'                      => mime_header('Сайт ' . $config['site_name']) . ' <' . $config['from'] . '>',
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];
if ($email !== '') {
    $headers['Reply-To'] = $email;
}

$subject = mime_header('Заявка с сайта: ' . $name);

$sent = mail($config['to'], $subject, $body, $headers, '-f' . $config['from']);
if (!$sent) {
    // Некоторые хостинги не разрешают менять адрес отправителя через -f
    $sent = mail($config['to'], $subject, $body, $headers);
}

if ($config['log_file'] !== '') {
    $record = json_encode([
        'time'    => date('c'),
        'name'    => $name,
        'phone'   => $phone,
        'email'   => $email,
        'page'    => $page,
        'message' => $message,
        'ip'      => $ip,
        'mailed'  => $sent,
    ], JSON_UNESCAPED_UNICODE);
    @file_put_contents($config['log_file'], $record . "\n", FILE_APPEND | LOCK_EX);
}

if (!$sent) {
    respond(false, 'Не удалось отправить заявку. Позвоните нам: ' . $config['phone'], 500);
}

respond(true, $thanks, 200);
