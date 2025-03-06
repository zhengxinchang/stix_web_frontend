import sys
import json
def main():
    with open(sys.argv[1]) as inf:
        title = next(inf)
        title = title.strip().split("\t")
        out = {}
        for line in inf:
            fields = line.strip().split("\t")
            tmp = {}
            for idx,field in enumerate(fields):

                tmp[title[idx]] = field
            out[fields[0]] =  tmp

    print(json.dumps(out,indent=4))


if __name__ == "__main__":
    main()