### Чтобы установить мой проект
```
1. git clone https://github.com/nstkm/template.git
2. cd template
2. bower install
3. npm install
4. для сборки проекта в папку dist:
   gulp build
5. для проверки получившейся папки dist:
   gulp server-dist
6. для автоматической компиляции изменений в проекте:
   gulp
```
Внимание, если после команды gulp происходит ошибка, посмотреть, какой плагин не скачался, и установить его:
`npm install <имя-плагина>`