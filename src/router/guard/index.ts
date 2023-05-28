import router from "../index";
import {createDiscreteApi} from "naive-ui";

const {loadingBar} = createDiscreteApi(
    ['loadingBar']
)

router.beforeEach(async (to, from) => {
    loadingBar.start()
    return true
})

router.afterEach(async (to, from) => {
    loadingBar.finish()
    return true
})
