y=[300 311; 390 425; 312 321; 250 185; 550 535; 420 432; 410 520];
b=bar(y);
grid on;
ch=get(b, 'children')
set(gca, 'XTickLabel', {'0','1', '2', '3', '4', '5', '6'})
set(ch, 'FaceVertexCData', [1 0 1; 0 0 0;])
legent('xxx', 'YYY');
xlabel('x axis');
ylabel('y axis');