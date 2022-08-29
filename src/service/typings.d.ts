declare namespace API {
    type CurrentUser = {
        /**
         * 是否为根节点
         */
        belongRootNode: boolean;
        /**
         * 企业id list
         */
        orgIdSet: number[];
        /**
         * token 令牌
         */
        token: string;
        /**
         * token 类型
         */
        tokenType: 'Bearer';
        /**
         * 用户名
         */
        userFullNameCn: string;
        /**
         * 用户id
         */
        userNo: string;
    };
    type Plantform = {
        platformId: string;
        platformLogo: string;
        platformName: string;
    };
}
