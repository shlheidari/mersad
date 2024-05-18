using AjaxControlToolkit.HtmlEditor.ToolbarButtons;
using Stimulsoft.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Web;

namespace MersadWebApplication
{
    public class TestPassword
    {
        public static bool Contains(string target, string list)
        {
            return target.IndexOfAny(list.ToCharArray()) != -1;
        }
        public int returnClass(string password)
        {
            //Let’s start by defining all of the standards for a password.
            int minLength = 8;

            //string lowercase = "qwertyuiopasdfghjklzxcvbnm";
            //string uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";
            //string digits = "0123456789";
            //string specialChars = "!@#$%^&*()_+-=[]|{};:<>?,.";

            //Ask the user to enter a password and capture their input in a variable.
           
             

            //Make boolean so we can use in if statements later on for validation 
            bool containsAtLeastOneUppercase = password.Any(char.IsUpper);
            bool containsAtLeastOneLowercase = password.Any(char.IsLower);
            bool containsAtLeastOneSpecialChar = password.Any(ch => !Char.IsLetterOrDigit(ch));
            bool containsAtLeastOneDigit = password.Any(char.IsDigit);

            //Define a variable score to hold their score and set it to 0.
            int score = 0;

            //If the password is greater than or equal to the minimum length, add a point to the score.
            if (password.Length >= minLength)
            {
                score++;
                //Console.WriteLine("Minimum Length test passed.");
            }
            else
            {
               // Console.WriteLine("Minimum Length test failed.");
            }

            //If the password contains uppercase letters, add a point.
            //if (Tools.Contains(password, uppercase))
            if (containsAtLeastOneUppercase)
            {
                score++;
                //Console.WriteLine("Uppercase test passed.");
            }
            else
            {
                //Console.WriteLine("Uppercase test failed.");
            }

            //If the password contains lowercase letters, add a point.
            //if (Tools.Contains(password, lowercase))
            if (containsAtLeastOneLowercase)
            {
                score++;
               // Console.WriteLine("Lowercase test passed.");
            }
            else
            {
               // Console.WriteLine("Lowercase test failed.");
            }

            //If the password contains digits, add a point.
            //if (Tools.Contains(password, digits))
            if (containsAtLeastOneDigit)
            {
                score++;
               // Console.WriteLine("Digits test passed.");
            }
            else
            {
                Console.WriteLine("Digits test failed.");
            }

            //If the password contains special characters, add a point.
            //if (Tools.Contains(password, specialChars))
            if (containsAtLeastOneSpecialChar)
            {
                score++;
                //Console.WriteLine("Special Characters test passed.");
            }
            else
            { 
            }

            //Print the score to the console
            //Console.WriteLine($"Final Score: {score}");

            


            return  score;

        }
    }
}