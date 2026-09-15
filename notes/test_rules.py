def r6inv(w):
    if w[6] == "1":
        return "0"
    if w[3] == "1" and w[4] == "1" and w[6] == "0":
        return "0"
    if w[3:6] == "000":
        return "1"
    if w[4:6] == "11":
        return "1"
    if w[4] == "1" and w[7:9] == "01":
        return "1"
    if w[5] == "1" and w[7] == "1":
        return "1"
    if w[2:4] == "01" and w[5] == "0":
        return "1"
    if w[2:4] == "10":
        return "0"
    if w[2] == "1" and w[5] == "0" and w[7] == "0":
        return "1"
    if w[5] == "1" and w[8:10] == "01":
        return "0"
    if w[1:3] == "00" and w[4] == "0":
        return "1"
    if w[0] == "1" and w[5] == "0" and w[7] == "0":
        return "1"
    if w[1] == "1" and w[4] == "1":
        return "1"
    if w[5] == "0":
        return "0"
    if w[3] == "0" and w[8] == "0":
        return "0"
    return "1"

def r7inv(w):
    if w[2] == w[3] == "0":
        return "1"
    if w[2] == "0" and w[3] == "1":
        return "0"
    if w[3] == "0" and w[4] == "1":
        return "1"
    return "0"

def r23inv(w):
    if w[0:2] == "10":
        return "1"
    if w[2:4] == "11":
        return "0"
    if w[1] == w[3] == "1":
        return "0"
    if w[1:3] == "01":
        return "1"
    if w[3:5] == "10":
        return "0"
    if w[2] == "1" and w[4] == "0":
        return "0"
    if w[0] == "1":
        return "1"
    if w[1] == "1":
        return "0"
    return "1"

def r33inv(w):
    if w[2] == "1":
        return "0"
    if w[1] == w[3] == "0":
        return "1"
    if w[1] == w[3] == "1":
        return "1"
    if w[0] == w[1] == "1" and w[3] == "0":
        return "0"
    if w[1] == "0" and w[3] == w[4] == "1":
        return "0"
    return "1"

def r57inv(w):
    if w[4] == w[5] == "1":
        return "0"
    if w[3] == w[4] == "0":
        return "1"
    if w[5] == w[6] == "1":
        return "1"

    if w[2] == w[3] == w[6] == "1":
        return "0"
    if w[2] == w[3] == "0":
        return "0"
    if w[4] == w[5] == w[6] == "0":
        return "1"

    if w[1] == w[2] == w[3] == "1":
        return "0"
    if w[1] == "1" and w[3] == "0" and w[6] == "0":
        return "1"
    if w[1] == "0" and w[4] == "0" and w[5] == "0":
        return "0"

    if w[3] == w[4] == w[6] == w[7] == "1":
        return "1"
    if w[2] == "0" and w[4] == "1" and w[7] == "1":
        return "0"
    if w[0] == "1" and w[1] == "0" and w[2] == w[4] == w[6] == "1":
        return "0"

    if w[1] == "1" and w[2] == "0" and w[3] == w[5] == w[7] == "1":
        return "1"
    if w[2] == "0" and w[5] == "1" and w[7] == w[8] == "1":
        return "0"
    if w[5] == w[7] == "1":
        return "1"

    if w[5] == "1" and w[8] == "0":
        return "0"
    if w[2] == "0" and w[6] == "0":
        return "1"
    if w[2] == w[4] == "1" and w[6] == "0" and w[7] == "0":
        return "1"

    if w[6] == "0":
        return "0"
    if w[0] == "0" and w[1] == "1" and w[2] == "1":
        return "0"
    if w[2] == "1" and w[6] == w[7] == "1":
        return "1"

    if w[3] == w[4] == w[6] == w[8] == "1":
        return "1"
    if w[0] == "0":
        return "0"
    if w[2] == "0" and w[4] == "1":
        return "0"

    return "1"

def r77inv(w):
    if w[1] == w[3] == "0":
        return "1"
    if w[1] == w[3] == "1":
        return "0"
    if w[0] == w[4] == "0":
        return "1"
    if w[0] == w[4] == "1":
        return "0"
    return w[2]

def r6(w):
    if w == "001" or w == "010":
        return "1"
    return "0"

def r7(w):
    if w == "000" or w == "001" or w == "010":
        return "1"
    return "0"

def r23(w):
    if w == "100" or w == "010" or w == "001" or w == "000":
        return "1"
    return "0"

def r33(w):
    if w == "101" or w == "000":
        return "1"
    return "0"

# 57 = 32 + 16 + 8 + 1 = 101 100 011 000
def r57(w):
    if w == "101" or w == "100" or w == "011" or w == "000":
        return "1"
    return "0"

# 77 = 64 + 13 = 64 + 8 + 4 + 1 = 110 011 010 000
def r77(w):
    if w == "110" or w == "011" or w == "010" or w == "000":
        return "1"
    return "0"
    
def appf(w, f, n):
    r = ""
    for i in range(len(w)-n+1):
        r += f(w[i:i+n])
    return r

def words(n):
    if n == 0:
        yield ""
        return
    for w in words(n-1):
        yield w + "0"
        yield w + "1"

fr6 = lambda a:appf(a, r6, 3)
fr7 = lambda a:appf(a, r7, 3)
fr23 = lambda a:appf(a, r23, 3)
fr33 = lambda a:appf(a, r33, 3)
fr57 = lambda a:appf(a, r57, 3)
fr77 = lambda a:appf(a, r77, 3)
fr6inv = lambda a:appf(a, r6inv, 11)
fr7inv = lambda a:appf(a, r7inv, 5)
fr23inv = lambda a:appf(a, r23inv, 5)
fr33inv = lambda a:appf(a, r33inv, 5)
fr57inv = lambda a:appf(a, r57inv, 9)
fr77inv = lambda a:appf(a, r77inv, 5)

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
