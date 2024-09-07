const post = {
    root() {
        return routePaths.root.concat('post')
    },

    list() {
        return post.root()
    },

    create() {
        return post.root().concat('/create')
    },

    detail(id: string) {
        return post.root().concat(`/${id}`)
    },

    edit(id?: string) {
        return post.root().concat(id ? `/${id}/edit` : '/edit')
    },
}

export const routePaths = {
    root: '/',

    home() {
        return routePaths.root
    },

    about() {
        return routePaths.root.concat('about')
    },

    admin() {
        return routePaths.root.concat('admin')
    },

    post,
}
