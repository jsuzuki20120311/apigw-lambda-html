import ejs from 'ejs';
import path from 'path';
import fs from 'fs';


export const handler = async function(event, context) {
  // 今回はクエリパラメータからタイトルとコンテンツを取得
  const title = event.queryStringParameters?.title;
  const content = event.queryStringParameters?.content;

  // ejsテンプレートを読み込み
  const templatePath = path.resolve('./template.ejs');
  const template = await fs.promises.readFile(templatePath);

  // ejsテンプレートにパラメータを渡してbodyを生成
  const body = ejs.render(template.toString(), {
    title: title,
    content: content
  });

  return {
    statusCode: 200,
    headers: {
      // HTML文書を返すため、HTML文書のMIMEタイプ text/html を指定します。
      'Content-Type': 'text/html'
    },
    body: body
  };
};
