const post = {
    root() {
        return mainPath.root.concat('post')
    },

    list() {
        return post.root().concat('/list')
    },

    create(params?: string) {
        return post
            .root()
            .concat('/create')
            .concat(params ? `?${params}` : '')
    },

    temporaryList() {
        return post.root().concat('/temporary-list')
    },

    detail(id: string) {
        return post.root().concat(`/${id}`)
    },

    edit(id?: string) {
        return post.root().concat(id ? `/edit/${id}` : '/edit')
    },

    search(keyword: string) {
        return post.list().concat(`/search?keyword=${keyword}`)
    },
}

export const mainPath = {
    root: '/',

    home() {
        return mainPath.root
    },

    about() {
        return mainPath.root.concat('about')
    },

    post,
}
