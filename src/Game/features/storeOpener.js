export default class StoreOpener {
    openStore = (root) => {
        let shop = root?.state?.shop;

        if (!shop) return;

        if (!shop.enabled) {
            shop.enabled = true;
            console.log(`[SHIZOVAL] ${new Date().toJSON().slice(11, 19)} - The store is open`);
        }
    }
}