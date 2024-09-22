const post = {
    root() {
        return routePaths.root.concat('post')
    },

    list() {
        return post.root()
    },

    create(params?: string) {
        return post
            .root()
            .concat('/create')
            .concat(params ? `?${params}` : '')
    },

    temporarySaved() {
        return post.root().concat('/temporary-saved')
    },

    detail(id: string) {
        return post.root().concat(`/${id}`)
    },

    edit(id?: string) {
        return post.root().concat(id ? `/edit/${id}` : '/edit')
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
