export const routePaths = {
    root: '/',

    home() {
        return routePaths.root
    },

    about() {
        return routePaths.root.concat('about')
    },

    post(id?: string) {
        return routePaths.root.concat('post').concat(id ? `/${id}` : '')
    },

    admin() {
        return routePaths.root.concat('admin')
    },
}
