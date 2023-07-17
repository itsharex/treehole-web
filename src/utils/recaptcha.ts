import {grKey} from "./auth";

export const gr = new Promise<string>((resolve) => {
    (window as any).grecaptcha.ready(() => {
        // noinspection TypeScriptValidateJSTypes
        (window as any).grecaptcha.execute(grKey, {action: 'submit'}).then((token: string) => {
            resolve(token);
        });
    });
})
