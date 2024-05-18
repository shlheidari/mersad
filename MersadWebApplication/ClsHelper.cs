using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MersadWebApplication
{
    // Token: 0x02000003 RID: 3
    public class ClsHelper
    {
        // Token: 0x06000007 RID: 7 RVA: 0x00003318 File Offset: 0x00001518
        private const string CryptoKey = "{1B}:{F3}:{7k}:{m}:{69}:{Tzu}9}";
        private const string CryptoKeyCooke = "{3B}:{S6}:{7H}:{nn}:{33}:{JB}3}";

        public string GetMd5(string text) => ((IEnumerable<byte>)new MD5CryptoServiceProvider().ComputeHash(new UnicodeEncoding().GetBytes(text))).Aggregate<byte, string>("", (Func<string, byte, string>)((current, x) => current + string.Format("{0:x2}", (object)x)));

        public string Encode(string orginalContent)
        {
            string str;
            try
            {
                byte[] numArray = new byte[8]
                {
          (byte) 40,
          (byte) 32,
          (byte) 45,
          (byte) 29,
          (byte) 0,
          (byte) 76,
          (byte) 73,
          (byte) 59
                };
                byte[] bytes = Encoding.UTF8.GetBytes(orginalContent);
                byte[] inArray;
                using (TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider())
                {
                    using (MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider())
                        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.UTF8.GetBytes("{1B}:{F3}:{7k}:{m}:{69}:{Tzu}9}"));
                    cryptoServiceProvider1.IV = numArray;
                    inArray = cryptoServiceProvider1.CreateEncryptor().TransformFinalBlock(bytes, 0, bytes.Length);
                }
                str = Convert.ToBase64String(inArray, 0, inArray.Length);
            }
            catch
            {
                str = string.Empty;
            }
            return str;
        }

        public string Decode(string encodedString)
        {
            string empty;
            try
            {
                byte[] numArray = new byte[8]
                {
          (byte) 40,
          (byte) 32,
          (byte) 45,
          (byte) 29,
          (byte) 0,
          (byte) 76,
          (byte) 73,
          (byte) 59
                };
                byte[] inputBuffer = Convert.FromBase64String(encodedString);
                byte[] bytes;
                using (TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider())
                {
                    using (MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider())
                        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.UTF8.GetBytes("{1B}:{F3}:{7k}:{m}:{69}:{Tzu}9}"));
                    cryptoServiceProvider1.IV = numArray;
                    bytes = cryptoServiceProvider1.CreateDecryptor().TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
                }
                empty = Encoding.UTF8.GetString(bytes);
            }
            catch
            {
                empty = string.Empty;
            }
            return empty;
        }

        public string EncodeCookie(string orginalContent)
        {
            string str;
            try
            {
                byte[] numArray = new byte[8]
                {
          (byte) 33,
          (byte) 22,
          (byte) 55,
          (byte) 49,
          (byte) 4,
          (byte) 76,
          (byte) 58,
          (byte) 13
                };
                byte[] bytes = Encoding.UTF8.GetBytes(orginalContent);
                byte[] inArray;
                using (TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider())
                {
                    using (MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider())
                        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.UTF8.GetBytes("{3B}:{S6}:{7H}:{nn}:{33}:{JB}3}"));
                    cryptoServiceProvider1.IV = numArray;
                    inArray = cryptoServiceProvider1.CreateEncryptor().TransformFinalBlock(bytes, 0, bytes.Length);
                }
                str = Convert.ToBase64String(inArray, 0, inArray.Length);
            }
            catch
            {
                str = string.Empty;
            }
            return str;
        }

        public string DecodeCookie(string encodedString)
        {
            string empty;
            try
            {
                byte[] numArray = new byte[8]
                {
          (byte) 33,
          (byte) 22,
          (byte) 55,
          (byte) 49,
          (byte) 4,
          (byte) 76,
          (byte) 58,
          (byte) 13
                };
                byte[] inputBuffer = Convert.FromBase64String(encodedString);
                byte[] bytes;
                using (TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider())
                {
                    using (MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider())
                        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.UTF8.GetBytes("{3B}:{S6}:{7H}:{nn}:{33}:{JB}3}"));
                    cryptoServiceProvider1.IV = numArray;
                    bytes = cryptoServiceProvider1.CreateDecryptor().TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
                }
                empty = Encoding.UTF8.GetString(bytes);
            }
            catch
            {
                empty = string.Empty;
            }
            return empty;
        }

        public string GetPersianDate(DateTime dateTime)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            int num = persianCalendar.GetYear(dateTime);
            string str1 = num.ToString("0000");
            num = persianCalendar.GetMonth(dateTime);
            string str2 = num.ToString("00");
            num = persianCalendar.GetDayOfMonth(dateTime);
            string str3 = num.ToString("00");
            return string.Format("{0}/{1}/{2}", (object)str1, (object)str2, (object)str3);
        }

        public int GetPersianLastDay(DateTime dateTime)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            int month = persianCalendar.GetMonth(dateTime);
            bool flag = persianCalendar.IsLeapYear(dateTime.Year);
            if (month > 0 && month < 7)
                return 31;
            return month > 6 && month < 12 || flag && month == 12 || flag || month != 12 ? 30 : 29;
        }

        public string GetPersianDateTime(DateTime dateTime)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            return string.Format("{0}/{1}/{2}-{3}:{4}", (object)persianCalendar.GetYear(dateTime).ToString("0000"), (object)persianCalendar.GetMonth(dateTime).ToString("00"), (object)persianCalendar.GetDayOfMonth(dateTime).ToString("00"), (object)persianCalendar.GetHour(dateTime).ToString("00"), (object)persianCalendar.GetMinute(dateTime).ToString("00"));
        }

        public string GetPersianDateTimeWithMonthName(DateTime dateTime)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            string monthCaption = this.GetMonthCaption(persianCalendar.GetMonth(dateTime).ToString("00"));
            string str = "";
            if (dateTime.DayOfWeek.Equals((object)DayOfWeek.Saturday))
            {
                str = "شنبه";
            }
            else
            {
                DayOfWeek dayOfWeek = dateTime.DayOfWeek;
                if (dayOfWeek.Equals((object)DayOfWeek.Sunday))
                {
                    str = "یکشنبه";
                }
                else
                {
                    dayOfWeek = dateTime.DayOfWeek;
                    if (dayOfWeek.Equals((object)DayOfWeek.Monday))
                    {
                        str = "دوشنبه";
                    }
                    else
                    {
                        dayOfWeek = dateTime.DayOfWeek;
                        if (dayOfWeek.Equals((object)DayOfWeek.Tuesday))
                        {
                            str = "سه شنبه";
                        }
                        else
                        {
                            dayOfWeek = dateTime.DayOfWeek;
                            if (dayOfWeek.Equals((object)DayOfWeek.Wednesday))
                            {
                                str = "چهارشنبه";
                            }
                            else
                            {
                                dayOfWeek = dateTime.DayOfWeek;
                                if (dayOfWeek.Equals((object)DayOfWeek.Thursday))
                                {
                                    str = "پنج شنبه";
                                }
                                else
                                {
                                    dayOfWeek = dateTime.DayOfWeek;
                                    if (dayOfWeek.Equals((object)DayOfWeek.Friday))
                                        str = "جمعه";
                                }
                            }
                        }
                    }
                }
            }
            return string.Format("{0} {1} {2} {3}", (object)str, (object)persianCalendar.GetDayOfMonth(dateTime).ToString("00"), (object)monthCaption, (object)persianCalendar.GetYear(dateTime).ToString("0000"));
        }

        public string GetMonthCaption(string month)
        {
            switch (month)
            {
                case "01":
                    return "فروردین";
                case "02":
                    return "اردیبهشت";
                case "03":
                    return "خرداد";
                case "04":
                    return "تیر";
                case "05":
                    return "مرداد";
                case "06":
                    return "شهریور";
                case "07":
                    return "مهر";
                case "08":
                    return "آبان";
                case "09":
                    return "آذر";
                case "10":
                    return "دی";
                case "11":
                    return "بهمن";
                case "12":
                    return "اسفند";
                default:
                    return "";
            }
        }

        public DateTime GetGregorianDate(string persianDate)
        {
            persianDate = this.ConvertFaNumberToEn(persianDate);
            PersianCalendar persianCalendar = new PersianCalendar();
            string[] strArray = persianDate.Split('/');
            return persianCalendar.ToDateTime(Convert.ToInt32(strArray[0]), Convert.ToInt32(strArray[1]), Convert.ToInt32(strArray[2]), 0, 0, 0, 0);
        }

        public DateTime GetGregorianDateTime(string persianDate, string time)
        {
            persianDate = this.ConvertFaNumberToEn(persianDate);
            PersianCalendar persianCalendar = new PersianCalendar();
            string[] strArray1 = persianDate.Split('/');
            string[] strArray2 = time.Split(':');
            return persianCalendar.ToDateTime(Convert.ToInt32(strArray1[0]), Convert.ToInt32(strArray1[1]), Convert.ToInt32(strArray1[2]), Convert.ToInt32(strArray2[0]), Convert.ToInt32(strArray2[1]), 0, 0);
        }

        public bool IsValidNationalCode(string input)
        {
            this.ConvertFaNumberToEn(input);
            if (!Regex.IsMatch(input, "^\\d{10}$"))
                return false;
            switch (input)
            {
                case "0000000000":
                case "0123456789":
                case "1111111111":
                case "2222222222":
                case "3333333333":
                case "4444444444":
                case "5555555555":
                case "6666666666":
                case "7777777777":
                case "8888888888":
                case "9999999999":
                    return false;
                default:
                    int int32 = Convert.ToInt32(input.Substring(9, 1));
                    int num = Enumerable.Range(0, 9).Select<int, int>((Func<int, int>)(x => Convert.ToInt32(input.Substring(x, 1)) * (10 - x))).Sum() % 11;
                    return num < 2 && int32 == num || num >= 2 && int32 + num == 11;
            }
        }

        public bool IsFindNumber(string text) => new Regex("\\d+").IsMatch(text);

        public bool IsFindString(string text) => new Regex("[a-z]").IsMatch(text);

        public bool IsFindCapString(string text) => new Regex("[A-Z]").IsMatch(text);

        public bool IsFindOtherChar(string text) => new Regex("[.,!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]").IsMatch(text);

        public bool IsNumberWithNegative(string text) => new Regex("^-?\\d+$").IsMatch(text);

        public bool IsNumber(string text) => new Regex("^[0-9]+$").IsMatch(text);

        public string GetNumbers(string text)
        {
            text = text ?? "";
            return Regex.Replace(text, "[^0-9]", "");
        }

        public bool IsPersian(string text) => new Regex("[^\0-~]").IsMatch(text);

        public bool IsMobile(string text) => new Regex("^[0-9]{11,11}$").IsMatch(text);

        public string ConvertFaNumberToEn(string s) => string.IsNullOrEmpty(s) ? "" : s.Replace("۰", "0").Replace("۱", "1").Replace("۲", "2").Replace("۳", "3").Replace("۴", "4").Replace("۵", "5").Replace("۶", "6").Replace("۷", "7").Replace("۸", "8").Replace("۹", "9").Replace("٠", "0").Replace("١", "1").Replace("٢", "2").Replace("٣", "3").Replace("٤", "4").Replace("۴", "4").Replace("٥", "5").Replace("٦", "6").Replace("٧", "7").Replace("۸", "8").Replace("٩", "9").Replace("٨", "8");

        public string ConvertNumberToFa(string s) => string.IsNullOrEmpty(s) ? "" : s.Replace("0", "۰").Replace("1", "۱").Replace("2", "۲").Replace("3", "۳").Replace("4", "۴").Replace("5", "۵").Replace("6", "۶").Replace("7", "۷").Replace("8", "۸").Replace("9", "۹").Replace("٠", "۰").Replace("١", "۱").Replace("٢", "۲").Replace("٣", "۳").Replace("٤", "۴").Replace("۴", "۴").Replace("٥", "۵").Replace("٦", "۶").Replace("٧", "۷").Replace("۸", "۸").Replace("٩", "۹").Replace("٨", "۸");

        public string ErrorMessages(string str) => string.Format("<div class='alert alert-danger'><i class='fa fa-exclamation-circle fa-2x'></i><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>{0}</div>", (object)str);

        public string SuccessMessages(string str) => string.Format("<div class='alert alert-success'><i class='fa fa-check-circle fa-2x'></i><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>{0}</div>", (object)str);

        public string WarningMessages(string str) => string.Format("<div class='alert alert-warning'><i class='fa fa-exclamation-triangle fa-2x'></i><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>{0}</div>", (object)str);

        public ClsHelper.PasswordScore CheckStrength(string password)
        {
            int num = 0;
            if (password.Length < 1)
                return ClsHelper.PasswordScore.Blank;
            if (password.Length < 4)
                return ClsHelper.PasswordScore.VeryWeak;
            if (password.Length >= 6)
                ++num;
            if (password.Length >= 10)
                ++num;
            if (this.IsFindNumber(password))
                ++num;
            if (this.IsFindString(password))
                ++num;
            if (this.IsFindCapString(password))
                ++num;
            if (this.IsFindOtherChar(password))
                ++num;
            return (ClsHelper.PasswordScore)num;
        }

        public bool ExceptionMessages(string ex, HtmlGenericControl lblMessage)
        {
            if (ex.StartsWith("Input string was not in a correct format"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("لطفا کارکترهای حروف در کادرهای عددی وارد نکنید!");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Value was either too large or too small for an Int32"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("لطفا اعداد ورودی خود را بررسی کنید، عددی بزرگتر از حد مجاز وارد کردید!");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Day must be between 1 and 29 for month 12"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، ماه اسفند سال انتخاب شده،29 روزه است ");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Day must be between 1 and 30 for month 12"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، ماه اسفند سال انتخاب شده،30 روزه است ");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("SqlDateTime overflow."))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، تاریخ وارد شده اشتباه است ");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Day must be between 1 and 31 for month"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، شش ماه اول سال ،31 روزه است ");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Day must be between 1 and 30 for month"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، 5 ماه دوم سال ،30 روزه است ");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Month must be between one and twelve"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، ماه باید بین عدد 1 تا 12 انتخاب شود!");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Valid values are between 1 and 9378"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("تاریخ ها را بررسی کنید، سال باید بین عدد 1 تا 1500 انتخاب شود!");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.IndexOf("is not a valid worksheet name. Valid worksheet names are") > -1)
            {
                lblMessage.InnerHtml = this.ErrorMessages("نام شیت اکسل بدرستی وارد نشده!");
                lblMessage.Visible = true;
                return true;
            }
            if (ex.StartsWith("Arithmetic overflow error for type tinyint, value = 375.000000"))
            {
                lblMessage.InnerHtml = this.ErrorMessages("لطفا اعداد ورودی خود را بررسی کنید، عددی بزرگتر از حد مجاز وارد کردید!");
                lblMessage.Visible = true;
                return true;
            }
            if (!ex.StartsWith("Hour, Minute, and Second parameters describe an un-representable DateTime"))
                return false;
            lblMessage.InnerHtml = this.ErrorMessages("لطفا ساعت،دقیقه،ثانیه ورودی خود را بررسی کنید، ساعت وارد شده صحیح نمیباشد!");
            lblMessage.Visible = true;
            return true;
        }

        public void AddGridHeader(GridView grid)
        {
            if (grid.Rows.Count <= 0)
                return;
            grid.UseAccessibleHeader = false;
            grid.HeaderRow.TableSection = TableRowSection.TableHeader;
        }

        public enum PasswordScore
        {
            Blank,
            VeryWeak,
            Weak,
            Medium,
            Strong,
            VeryStrong,
        }

    }
}
