const defaultHeaderProps = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  
  /** 解析response的headers信息
   * @param headers
   * @returns {*}
   */
  export default headers => {
    const finalheaders = { ...defaultHeaderProps, ...headers };
  
    Object.keys(finalheaders).forEach(key => {
      if (typeof finalheaders[key] === 'object') {
        finalheaders[key] = JSON.stringify(finalheaders[key]);
      }
    });
  
    return finalheaders;
  };
  