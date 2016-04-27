class Y;

class X {
  // members in X

private:
  Y *ptr;
};

class Y {
  // memebers in Y
  X xobj;
};
