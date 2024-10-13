export const adminPageParams = {
    account: 'account-page',
    comment: 'comment-page',
}

export const adminPath = {
    root: '/admin',
    admin() {
        return adminPath.root.concat(`?${adminPageParams.account}=1&${adminPageParams.comment}=1`)
    },
}
