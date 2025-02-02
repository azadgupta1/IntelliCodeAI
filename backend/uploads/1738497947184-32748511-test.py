def calculate_average(numbers):
    total = sum(numbers)
    avg = total / len(numbers)
    return avg


result = calculate_averages([10, 20, 30, 40])
print(f"The average is {result}")
