### Чтобы установить мой проект
```
1. git clone https://github.com/nstkm/template.git
2. cd template
2. bower install && npm install
3. для сборки проекта в папку dist:
   gulp build
4. для проверки получившейся папки dist:
   gulp server-dist
5. для автоматической компиляции изменений в проекте:
   gulp
```
Внимание, если после команды gulp происходит ошибка, посмотреть, какой плагин не скачался, и установить его:
`npm install <имя-плагина>`