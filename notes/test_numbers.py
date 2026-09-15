# we use the convention that for radius 1 numbers are in decimal,
# and in hex from nbhd size 4 onward

r6invnum = """
00000000000000000000FFF3000000FF0000FFFF000000F00000FF000000FFFF
00000000000000000000FFF30000FFFF0000FFFF0000FFFF0000FFF00000FFFF
00000000000000000000FFF3000000FF0000FFFF000000F00000FF000000FFFF
00000000000000000000FFF30000FFFF0000FFFF000000FF0000FFF30000FFFF
00000000000000000000FFF3000000FF0000FFFF000000F00000FF000000FFFF
00000000000000000000FFF30000FFFF0000FFFF0000FFFF0000FFF00000FFFF
00000000000000000000FFF3000000FF0000FFFF000000F00000FF000000FFFF
00000000000000000000FFF30000FFFF0000FFFF000000F00000FFF30000FFFF
"""

r7invnum = "23232323"

r23invnum = "23FF003B"

r33invnum = "0C070F07"

r57invnum = """
0000F00F00FFFFFF00E3FEFF0000FFFF0003FC0F0003FFFF00E3F60F0000FFFF
0000F00F000FFFFF00E3FE0F0000FFFF0003FC0F00C3FFFF00E3F60F0000FFFF
"""

r77invnum = "107331F7"

r6num = "6"
r7num = "7"
r23num = "23"
r33num = "33"
r57num = "57"
r77num = "77"

def singleappfnum(numstr, n, w):
    numstr = ''.join(numstr.split())
    if len(w) != n:
        print ("Wrong neighborhood.")
    if n <= 3:
        num = int(numstr)
    else:
        num = int(numstr, 16)
    # now convert to binary and remove "0b" prefix
    binrepr = bin(num)[2:]
    widx = int(w, 2)
    if widx >= len(binrepr):
        return "0"
    return binrepr[-widx-1]
    
def appfnum(w, numstr, n):
    r = ""
    for i in range(len(w)-n+1):
        # NB. I know it's reparsed every time.
        r += singleappfnum(numstr, n, w[i:i+n])
    return r

def words(n):
    if n == 0:
        yield ""
        return
    for w in words(n-1):
        yield w + "0"
        yield w + "1"

fr6 = lambda a:appfnum(a, r6num, 3)
fr7 = lambda a:appfnum(a, r7num, 3)
fr23 = lambda a:appfnum(a, r23num, 3)
fr33 = lambda a:appfnum(a, r33num, 3)
fr57 = lambda a:appfnum(a, r57num, 3)
fr77 = lambda a:appfnum(a, r77num, 3)
fr6inv = lambda a:appfnum(a, r6invnum, 11)
fr7inv = lambda a:appfnum(a, r7invnum, 5)
fr23inv = lambda a:appfnum(a, r23invnum, 5)
fr33inv = lambda a:appfnum(a, r33invnum, 5)
fr57inv = lambda a:appfnum(a, r57invnum, 9)
fr77inv = lambda a:appfnum(a, r77invnum, 5)

# testing rule 6
for w in words(15):
    if fr6(w)[6] != fr6(fr6inv(fr6(w))):
        print ("problem for rule 6:")
        print (w)
        print (" "+fr6(w))
        print ("      "+fr6inv(fr6(w)))
        print ("       "+fr6(fr6inv(fr6(w))))
        break
else:
    print ("inverse of rule 6 is ok")

# testing rule 7
for w in words(9):
    if fr7(w)[3] != fr7(fr7inv(fr7(w))):
        print ("problem with rule 7:")
        print (w)
        print (" "+fr7(w))
        print ("   "+fr7inv(fr7(w)))
        print ("    "+fr7(fr7inv(fr7(w))))
        break
else:
    print ("inverse of rule 7 is ok")

# testing rule 23
for w in words(9):
    if fr23(w)[3] != fr23(fr23inv(fr23(w))):
        print ("problem with rule 23:")
        print (w)
        print (" "+fr23(w))
        print ("   "+fr23inv(fr23(w)))
        print ("    "+fr23(fr23inv(fr23(w))))
        break
else:
    print ("inverse of rule 23 is ok")

# testing rule 33
for w in words(9):
    if fr33(w)[3] != fr33(fr33inv(fr33(w))):
        print ("problem with rule 33:")
        print (w)
        print (" "+fr33(w))
        print ("   "+fr33inv(fr33(w)))
        print ("    "+fr33(fr33inv(fr33(w))))
        break
else:
    print ("inverse of rule 33 is ok")

# testing rule 57
for w in words(13):
    if fr57(w)[5] != fr57(fr57inv(fr57(w))):
        print ("problem for rule 57:")
        print (w)
        print (" "+fr57(w))
        print ("     "+fr57inv(fr57(w)))
        print ("      "+fr57(fr57inv(fr57(w))))
        break
else:
    print ("inverse of rule 57 is ok")

# testing rule 77
for w in words(9):
    if fr77(w)[3] != fr77(fr77inv(fr77(w))):
        print ("problem with rule 77:")
        print (w)
        print (" "+fr77(w))
        print ("   "+fr77inv(fr77(w)))
        print ("    "+fr77(fr77inv(fr77(w))))
        break
else:
    print ("inverse of rule 77 is ok")
