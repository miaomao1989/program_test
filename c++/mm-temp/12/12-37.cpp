#include <string>

class Account {
public:
  // 构造hanshu
  Account(std::string own, double amnt)
  {
    owner = own;
    amount = amnt;
  }

  // 计算余额
  void applyint()
  {
    amount += amount * interestRate;
  }

  // 返回当前利率
  static double rate()
  {
    return interestRate;
  }

  // 设置新的利率
  static void rate(double newRate)
  {
    interestRate = newRate;
  }

  //存款
  double deposit(double amnt)
  {
    amount += amnt;
    return amount;
  }

  //取款
  bool withdraw(double amnt)
  {
    if (amount < amnt)      //余额不足
      return false;
    else {
      amount -= amnt;
      return true;
    }
  }

  // 查询当前余额
  double getBalance()
  {
    return amount;
  }

private:
  std::string owner;
  double amount;
  static double interestRate;
};

double Account::interestRate = 2.5;
