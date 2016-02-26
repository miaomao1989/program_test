#ifndef SALESITEM_H
#define SALESITEM_H

//Definition of Sales_item class and related functions goes here

#include <iostream>
#include <string>

class Sales_item {
public:
	// added constructors to initialize from a string or an istream
	Sales_item(const std::string &book):
		isbn(book), units_sold(0), revenue(0.0) { }
	Sales_item(std::istream &is) { is >> *this; }
	friend std::istream & operator>>(std::istream &, Sales_item &);
	friend std::ostream & operator<<(std::ostream &, const Sales_item &);

public:
	// operations on Sales_item objects
	// member binary operator: left-hand operand bound to implicit this pointer


public:
	// operations on Sales_item objects
	double avg_price() const;
	bool same_isbn(const Sales_item &rhs) const
	{	return isbn == rhs.isbn; }
	// default constructor needed to initialize members of built-in type
	Sales_item(): units_sold(0), revenue(0.0) { }

//private members as before
private:
	std::string isbn;
	unsigned units_sold;
	double revenue;

};


#endif
