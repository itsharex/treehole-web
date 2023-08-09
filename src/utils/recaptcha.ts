import {grKey} from "./auth";

declare const grecaptcha: any;

export const gr = () => new Promise<string>((resolve) => {
    grecaptcha.ready(() => {
        grecaptcha.execute(grKey, {action: 'submit'}).then((token: string) => {
            resolve(token);
        });
    });
})
