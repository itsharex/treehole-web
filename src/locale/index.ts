import {createI18n} from "vue-i18n";
import en from './en-US';
import zh from './zh-CN';

const i18n = createI18n({
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    allowComposition: true,
    messages: {
        'en-US': en,
        'zh-CN': zh,
    }
})

export default i18n