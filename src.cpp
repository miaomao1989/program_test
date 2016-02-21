#include<iostream>
#include<math.h>
using namespace std; 
#define M 40
#define N 80
  double T[M*N];   
  double a[M*N][M*N];
  double H[M*N];


double r=1.7,Q=60000,ql=500,qr=200,Tw=70,v=3,Tinf=25;
double h=0.1/M;
double Ry=h/(2*r)+1/v;
void SOR(double a[M*N][ M*N],double T[M*N],double H[M*N]);
void newH(double H[M*N],double T[M*N]);
int main()
{

  int k=0;
  for(int j=0;j<M;j++)
  {
	  if(j==0)
	  {
			for(int i=0;i<N;i++)
			{ 
				if(i==0) { 
					a[k][k]=4;
					a[k][k+1]=-1;
			//		a[k][k-1]=0;
					H[k]=2*Tw+ql*h/r+Q*h*h/r+T[1*N+0];
					k++;
				}
				
				else if(0<i<N-1)
				{ 
					a[k][k]=5;
					a[k][k+1]=-1;
					a[k][k-1]=-1;
					H[k]=2*Tw+Q*h*h/r+T[1*N+i];
					k++;
				}

				else
				{ 
					a[k][k]=4;
					a[k][k+1]=0;
					a[k][k-1]=-1;
					H[k]=2*Tw+qr*h/r+Q*h*h/r+T[1*N+N-1];
					k++;
				}
			}
	  }

	  else if(0<j<M-1)
        for(int i=0;i<N;i++)
         { if(i==0)
           { a[k][k]=3;
             a[k][k+1]=-1;
             a[k][k-1]=0;
             H[k]=ql*h/r+Q*h*h/r+T[(j-1)*N+0]+T[(j+1)*N+0];
                k++;
            }
           else if(0<i<N-1)
            { a[k][k]=4;
              a[k][k+1]=-1;
              a[k][k-1]=-1;
              H[k]=Q*h*h/r+T[(j-1)*N+i]+T[(j+1)*N+i];
                k++;
             }
           else
            { a[k][k]=3;
              a[k][k+1]=0;
              a[k][k-1]=-1;
              H[k]=qr*h/r +Q*h*h/r+T[(j-1)*N+N-1]+T[(j+1)*N+N-1];
               k++;
            }
          }

     else
       for(int i=0;i<N;i++)
        { if(i==0)
           { a[k][k]=2+h/(r*Ry);
             a[k][k+1]=-1;
             a[k][k-1]=0;
             H[k]=ql*h/r+Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+0];
                k++;
           }
          else if(0<i<N-1)
           { a[k][k]=3+h/(r*Ry);
             a[k][k+1]=-1;
             a[k][k-1]=-1;
             H[k]=Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+i] ;
                k++;
            }
          else
           { a[k][k]=2+h/(r*Ry);
            // a[k][k+1]=0;
             a[k][k-1]=-1;
             H[k]=qr*h/r+Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+N-1];
                k++;
            }
         }
     }
  SOR(a,T,H);

  for(int j=0;j<M;j++)
	{ 
		for(int i=0;i<N;i++)
		{
			cout<<T[j*N+i]<<" ";
		}
        cout<<"\n";
     }
  return 0;
}


void SOR(double a[M*N][M*N],double T[M*N],double H[M*N])
{ 
long maxn;
double epsilon,e,w,oldT,sum;
int n;
cout<<"输入最大迭代次数:"<<endl;
cin>>maxn;
cout<<"输入精度:"<<endl;
cin>> epsilon;
cout<<"松弛因子:"<<endl;
cin>>w;
for(n=0;n<maxn;n++)
 { e=0;
    for(int j=0;j<M*N;j++)
      { oldT=T[j];
        sum=0;
        if(j==0)
         sum=a[0][0]*T[0]+a[0][1]*T[1];
        else if(j==M*N-1)
         sum=a[M*N-1][ M*N-1]*T[M*N-1]+a[M*N-1][M*N-2]*T[M*N-2];
        else
         sum=a[j][j-1]*T[j-1]+a[j][j]*T[j]+a[j][j+1]*T[j+1];
         T[j]=oldT+(w*(H[j]-sum)/a[j][j]);
         newH(H,T);
         if (e<fabs((oldT-T[j])/oldT))
           e=fabs((oldT-T[j])/oldT);
       }
    if(e<epsilon)
        break;
 }

   if(n<maxn)
cout<<"迭代次数:"<<n<<endl;
   else
       cout<<"迭代次数超出上限:"<<endl;
}

void newH(double H[M*N],double T[M*N])
{ int k=0;
  for(int j=0;j<M;j++)
    { if(j==0)
        for(int i=0;i<N;i++)
         { if(i==0)
           { H[k]=2*Tw+ql*h/r+Q*h*h/r+T[1*N+0];
               k++;
           }
          else if(0<i<N-1)
           { H[k]=2*Tw+Q*h*h/r+T[1*N+i];
               k++;
           }
          else
           { H[k]=2*Tw+qr*h/r+Q*h*h/r+T[1*N+N-1];
               k++;
           }
		}

      else if(0<j<M-1)
         for(int i=0;i<N;i++)
           { if(i==0)
             { H[k]=ql*h/r+Q*h*h/r+T[(j-1)*N+0]+T[(j+1)*N+0];
                k++;
              }
             else if(0<i<N-1)
             { H[k]=Q*h*h/r+T[(j-1)*N+i]+T[(j+1)*N+i];
                k++;
             }
             else
             { H[k]=qr*h/r+Q*h*h/r+T[(j-1)*N+N-1]+T[(j+1)*N+N-1];
                k++;
             }
           }

      else
         for(int i=0;i<N;i++)
           { if(i==0)
              { H[k]=ql*h/r+Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+0];
                k++;
              }
             else if(0<i<N-1)
              { H[k]=Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+i] ;
                k++;
              }
             else
              { H[k]=qr*h/r+Q*h*h/r+Tinf*h/(r*Ry)+T[(M-2)*N+N-1];
                k++;
              }
           }
  }
}
		

