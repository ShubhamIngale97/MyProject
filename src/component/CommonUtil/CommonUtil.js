import english from './../../Language/english.json';

const combinedLang = {
    ...english
  }


function localized(name) {
    if (global.languageProps && global.languageProps[name]) {
      return global.languageProps[name];
    } else {
      if (combinedLang[name]) {
        return combinedLang[name];
      } else {
        return name;
      }
    }
}

export {localized}