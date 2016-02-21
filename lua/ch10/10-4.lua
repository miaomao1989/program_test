function fwrite (fmt, ...)
	-- return io.write(string.format(fmt, table.unpack(...)))
	return io.write(string.format(fmt, ...))
end

function BEGIN ()
	io.write( [[
	<HTML>
	<HEADl><TITLE>Projects using Lua</TITLE></HEAD>
	<BODY BGCOLOR ="#FFFFFF">
	Here are brief descriptions of some projects around the 
	world taht use <A HREF="home.html">Lua</A>.
	]] )
end


function entry0 (o)
	N = N + 1
	local title = o.title or '(no title)'
	fwrite('<LI><A HREF = "#%d">%s</A>\n', N, title)
end

function entry1 (o)
	N = N + 1
	local title = o.title or o.org or 'org'
	fwrite('<HR>\n<H3>\n')
	local href = ''

	if o.url then
		href = string.format(' HREF="%s"', o.url)
	end
	fwrite('<A NAME="%d"%s>%s</A>\n', N, href, title)

	if o.title and o.org then
		fwrite('\n<SMALL><EM>%s</EM></SMALL>', o.org)
	end
	fwrite('\n</H3>\n')

	if o.description then
		fwrite('%s', string.gsub(o.description, '\n\n\n*', '<P>\n'))
		fwrite('<P>\n')
	end
	
	if o.email then
		fwrite('Constact: <A HREF="mailto:%s">%s</A>\n',
		o. email, o.contact or o.email)
	elseif o.contact then
		fwrite('Contact: %s\n', o.contact)
	end
end

function END ()
	fwrite('</BODY></HTML>\n')
end

BEGIN()

N = 0
-- dofile('db.lua')
-- require("db")
entry = entry0
dofile('db.lua')
-- fwrite('<UL>\n')
-- fwrite('</UL>\n')

N = 0
-- require("db")
entry = entry1
dofile('db.lua')

END()
