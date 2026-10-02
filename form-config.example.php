<?php
/**
 * Пример настроек обработчика формы.
 *
 * Скопируйте файл на хостинг уровнем ВЫШЕ корня сайта под именем form-config.php:
 *   /home/<аккаунт>/dykhanov-consult.ru/form-config.php   ← настройки
 *   /home/<аккаунт>/dykhanov-consult.ru/public_html/      ← содержимое dist/
 * Указывайте только те значения, которые отличаются от DEFAULTS в public/api/send.php.
 */

return [
    // Куда приходят заявки (можно несколько адресов через запятую)
    'to'       => 'g.dykhanov@kccbe.ru',
    // Адрес отправителя на домене сайта — так письма реже попадают в спам
    'from'     => 'noreply@dykhanov-consult.ru',
    // Журнал заявок на случай проблем с почтой. Храните вне корня сайта.
    'log_file' => __DIR__ . '/leads.jsonl',
];
