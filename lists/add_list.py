# Find the largest number from three numbers
def max_num(num1, num2, num3):
    if num1 > num2:
        if num1 > num3:
            print(f'{num1} is the largest')
        else:
            print(f'{num3} is the largest')

    elif num1 < num2:
        if num3 < num2:
            print(f'{num2} is the largest')
        else:
            print(f'{num3} is the largest')

    elif num2 < num3:
        if num1 < num3:
            print(f'{num3} is the largest')
        else:
            print(f'{num1} is the largest')


if __name__ == "__main__":
    max_num(122, 322, 302)