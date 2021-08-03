const common = {
    myRegister: "/apis/login/register", // 注册
    isCode:"/apis/login/codePhonePc",   //验证码
    forgetPassword:"/apis/login/findPass",   //忘记密码
    myLogin:"/apis/login/login",   //登录
    personalDetails :"/apis/my/getMyInfo",   //个人信息
    myMessage :"/apis/my/myMsgList",   //我的消息
    myNeed :"/apis/my/myNeed",   //我的需求  
    upImage:"/apis/upload/img",//上传图片
    setMyDetial:"/apis/my/setMyinfo",//设置个人资料
    amendPhoneOne:"/apis/password/change_phone_one",//修改手机第一步
    amendPhoneTwo:"/apis/password/change_phone_two",//修改手机第二步
    amendEmailOne:"/apis/password/change_email_one",//修改邮箱第一步
    amendEmailTwo:"/apis/password/change_email_two",//修改邮箱第二步
    emailCode:"/apis/login/codeEmail",//发送邮箱验证码
    couponsList:"/apis/coupons/couponsList",//获取优惠劵列表
    getCoupons:"/apis/coupons/getCoupons",//领取优惠劵
    couponsNice:"/apis/coupons/couponsList_need",//获取购买商品时的优惠券
    myHistory:"/apis/my/myHistory",//我的足迹
    delHistory:"/apis/my/delHistory",//删除足迹 
    myComment:"/apis/my/myComment",//我的评价
    myCommentAll:"/apis/my/myCommentAll",//我的评价
    commentDel:"/apis/my/commentDel",//删除评价 
    // 首页
    slideshow:"/apis/home/slideshow",//首页轮播图
    homeHotGoods:"/apis/home/homeHotGoods",//首页获取热销产品
    homeNewGoods:"/apis/home/homeNewGoods",//首页新品速递
    recommendedGoods:"/apis/home/recommendedGoods",//获取推荐商品
    goodCateOne:"/apis/goods/goodCate",//商品一级分类
    goodsList:"/apis/goods/goodsList",//商品列表
    qingDanList:"/apis/trolley/qingDanList",//获取清单
    goodsDetial:"/apis/goods/goodDetail",//商品详情
    addQingDan:"/apis/trolley/addQingDan",//添加到清单
    addTrolley:"/apis/trolley/addTrolley",//商品详情
    goodComment:"/apis/goods/goodComment",//商品评价
    orderTo:"/apis/order/orderToPc",//生成订单
    getTrolley:"/apis/trolley/getTrolley",//购物车列表
    orderGet:"/apis/order/orderGet",//订单列表
    delTrolley:"/apis/trolley/delTrolley",//删除购物车商品
    getAddress:"/apis/address/getAddress",//获取收货地址列表
    addAddress:"/apis/address/addAddress",//添加收货地址
    delAddress:"/apis/address/delAddress",//添删除收货地址
    setAddress:"/apis/address/setAddress",//编辑收货地址
    setStatus:"/apis/address/setStatus",//设置默认收货地址
    orderSubmit:"/apis/order/orderSubmit",//提交订单
    orderDetail:"/apis/order/orderDetail",//订单详情
    orderDel:"/apis/order/orderDel",//订单详情
    orderFeedbackGet:"/apis/order/orderFeedbackGet",//订单评价
    orderFeedbackGetAll:"/apis/order/orderFeedbackGetAll",//订单评价
    orderBackGet:"/apis/order/orderBackGet",//退货申请提交
    myMsgDetail:"/apis/my/myMsgDetail",//退货申请提交
    delQingDan:"/apis/trolley/delQingDan",//删除清单
    setNum:"/apis/trolley/setNum",//更改购物车数量
    Goods:"/apis/order/Goods",//确认收货
    aboutUs:"/apis/my/aboutUs",//关于我们 ，用户协议 
    

    // 新增
    detialMinxi:"/apis/my/getMinXi",//余额明细
    myteam:"/apis/my/getMyTeam",//我的团队 
    myteamDetial:"/apis/my/getMyTeamdata",//我的团队
    myBrokerage:"/apis/my/coinExpand",//我的佣金&佣金说明
    getCode:"/apis/Qrcodes/getQrcode",//获取分享二维码
    
    
}

  
const Interface = {
    common,

}

export default Interface;