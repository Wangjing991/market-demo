import jsSHA from 'jssha';
import { isString } from 'lodash';

const ONE_DAY_DURATION = 24 * 60 * 60;

/**
 * dzhYun token 管理类
 */
export default class DzhYunTokenManager {
  private appid: string;
  private secret_key: string;
  private shortid: string;
  public token = '';

  constructor(appid: string, secret_key: string, shortid: string) {
    this.appid = appid;
    this.secret_key = secret_key;
    this.shortid = shortid;
  }

  /**
   * 判断 token 是否过期
   * @param token
   * @returns true-验证通过，没过期 false-验证失败，过期
   */
  timeVerify(token: string) {
    if (isString(token)) {
      const expireTime = parseInt(`${token.split(':')[1]}000`, 10);
      return expireTime > Date.now();
    }
    return false;
  }

  /**
   * 生成新的 token
   * @param duration token 有效时长,单位秒 默认一天
   * @returns
   */
  generateToken(duration = ONE_DAY_DURATION) {
    if (!this.appid || !this.secret_key || !this.shortid) {
      return '缺少信息，无法生成token';
    }
    const expiredTime = parseInt(`${Date.now() / 1000}`, 10) + duration;
    const rawMask = `${this.appid}_${expiredTime}_${this.secret_key}`;
    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(this.secret_key, 'TEXT');
    shaObj.update(rawMask);
    const hexMask = shaObj.getHMAC('HEX');
    const newToken = [this.shortid, expiredTime, hexMask].join(':');
    this.token = newToken;
    return newToken;
  }

  /**
   * 获取 token
   * @param duration token 有效时长 默认一天
   * @returns
   */
  getToken(duration = ONE_DAY_DURATION) {
    if (!this.token && this.timeVerify(this.token)) {
      return this.token;
    } else {
      return this.generateToken(duration);
    }
  }
}
