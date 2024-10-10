export const adminPath = {
    root: '/admin',
    admin() {
        return adminPath.root
    },
    users(id?: string) {
        return `${adminPath.root}/users`.concat(id ? `/${id}` : '')
    },

    comments() {
        return `${adminPath.root}/comments`
    },
}
