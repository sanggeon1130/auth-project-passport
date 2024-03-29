var template = {
    html:function(title, list, body, control, authStatusUI){
      return `
      <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
  ${authStatusUI}
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
    </p>
  </body>
  </html>

      `;
    },
    list:function(filelist){
      var list = "<ul>"
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href = "/topic/${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1;
      }
      list = list + "</ul>"
      return list;
    }
  }
  module.exports = template;