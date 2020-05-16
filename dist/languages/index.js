import idLang from './defaults/ID';
import enLang from './defaults/EN';

const variables = {
  ID: idLang,
  EN: enLang
};

export default ((type = 'EN', v, data) => {
  type = type.toUpperCase();
  let msg = variables[type][v];
  if (typeof data === 'object') {
    for (const key in data) {
      msg = msg.replace(new RegExp(x, 'ig'), data[key]);
    }
  }
  return msg;
});