
// !!! NOTE: if the given number n is <= 0, all my below programs return 0.



function sum_to_n_a(n: number): number {
	/* 
	Time complexity: O(n), where n is the given number n
	Space complexity: O(1)
	*/
	
	let ans = 0;
	for (let i=1; i<=n ; i++) {
		ans += i
	}
	return ans
}


function sum_to_n_b(n: number): number {
	/* 
	Time complexity: O(1)
	Space complexity: O(1)
	*/
	if (n <= 0){
		return 0
	}
	return n*(n+1)/2
}


function sum_to_n_c(n: number): number {
	/* 
	Time complexity: O(n), where n is the given number n
	Space complexity: O(n), where n is the given number n, here I use recursion approach and the stack memory takes O(n) space
	*/	
	if(n <= 0){
		return 0
	}
	return sum_to_n_c(n-1) + n
}

// TODO: assure 
for (let n = 0; n <=5 ; n++){
	console.log(sum_to_n_a(n))
	console.log(sum_to_n_b(n))
	console.log(sum_to_n_c(n))
}