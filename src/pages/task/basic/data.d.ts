export interface BasicShop {
  id: number;
  contactName: string;
  contactMobile: string;
  shopName: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  address: string;
  storeImg: string;
  logoImg: string;
  category: string;
  frontIdCard: string;
  backIdCard: string;
  faceIdCard: string;
  businessImg: string;
  licenseImg: string;
  auditStatus: number;
}

export interface RejectData {
  shopId: number;
  auditStatus: number;
  auditMsg: string;
  content: string;
}
