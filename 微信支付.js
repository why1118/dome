// public String notify(HttpServletRequest request) throws Exception {
//   String inputLine;
//   String notifyXml = "";
//   String resXml = "";
//   try {
//       while ((inputLine = request.getReader().readLine()) != null){
//           notifyXml += inputLine;
//       }
//       request.getReader().close();
//   } catch (Exception e) {
//       e.printStackTrace();
//   }

//   System.out.println("接收到的xml：" + notifyXml);
//   if(StringUtils.isEmpty(notifyXml)){
//       System.out.println("xml为空");
//   }
//   Map map = WXUtils.xmlToMap(notifyXml);
//   String out_trade_no = (String) map.get("out_trade_no");

//   QiYeMoneyLog moneyLog = new QiYeMoneyLog();moneyLog.setPayNo(out_trade_no);
//   QiYeMoneyLog log = moneyLogDao.selectOne(moneyLog);
//   if(log!= null && log.getPayState().equals(1)){//支付成功就不需要继续执行 直接返回成功
//       request.getSession().setAttribute("WX_PAY_STATE","PAY_SUCCESS");
//       return "<xml>"+"<return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg>"+"</xml> ";
//   }

//   if(!"SUCCESS".equals(map.get("return_code"))){
//       resXml = "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>" + "<return_msg><![CDATA[FAIL]]></return_msg>" + "</xml> ";
//   }else{
//       if(null != log){
//           request.getSession().setAttribute("WX_PAY_STATE","PAY_SUCCESS");
//           log.setPayState(1);
//           //删除支付二维码
//           QiNiuUpLode.delete(StringUtil.oldUrl(log.getPayQrUrl()));
//           log.setPayQrUrl("");
//           //修改支付状态为成功
//           moneyLogDao.updateById(log);
//           //修改企业账户余额
//           UserQiYe qiYe = qiYeDao.selectById(log.getQyId());
//           qiYe.setQyMoney(BigDecimalMath.add(qiYe.getQyMoney(),log.getQyLogMoney()));
//           qiYeDao.updateById(qiYe);

//           System.out.println("公众号支付成功，out_trade_no(订单号)为：" + out_trade_no);
//           resXml = "<xml>"+"<return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg>"+"</xml> ";
//       }
//   }
//   return resXml;
// }