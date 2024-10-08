const post = {
    root() {
        return mainPath.root.concat('post')
    },

    list(keyword?: string) {
        return post.root().concat(keyword ? `?keyword=${keyword}` : '')
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
        return post.root().concat(`/search?keyword=${keyword}`)
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
