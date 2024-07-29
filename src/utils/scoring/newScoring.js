import { questionnaireData } from "@/utils/data/questionnaire/index";

// Helper function to perform weighted random selection
function weightedRandom(data) {
  let min = 1;
  let max = 10;
  const rand = Math.floor(Math.random() * (max - min + 1)) + min;

  //  const rand = Math.random(); // Generate a random number between 0 and 1
//   console.log("data", data);

//   console.log("rand", rand);
  let cumulative = 0;
  for (const brand of data.supported_brands) {
    cumulative += brand.normalizedWeight * 10;
    // console.log("cumulative", cumulative);
    if (rand < cumulative) {
    //   console.log("returning brand id", brand.form_id);

      return brand.form_id; // Return the ID of the chosen brand
    }
  }
}

// Function to prepare the data structure with total weight, normalized weights, and brand IDs
function prepareWeightData(supported_brands) {
  let totalWeight = supported_brands.reduce(
    (sum, brand) => sum + brand.weight,
    0
  );
//   console.log("totalWeight", totalWeight);
  if (totalWeight === 0) {
    totalWeight = 1;
  }
  const normalizedBrands = supported_brands.map((brand) => ({
    ...brand,
    normalizedWeight: brand.weight / totalWeight,
  }));
  // Shallow copy the array for comparison
  const beforeSorting = [...normalizedBrands];
//   console.log("before sorting", beforeSorting);

  // Sort the normalized brands
  normalizedBrands.sort((a, b) => a.normalizedWeight - b.normalizedWeight);
//   console.log("after sorting", normalizedBrands);

  return {
    totalWeight,
    supported_brands: normalizedBrands,
  };
}

// Function to choose a brand based on the predefined weights and purchase time condition
export function chooseBrand(responseData) {
  // Start with the default weights
//   let supported_brands = [...questionnaireData.supported_brands];

let supported_brands = JSON.parse(JSON.stringify(questionnaireData.supported_brands));
// console.log('copy supported brands',supported_brands);

// Filter the questions included in scoring
  const includedQuestions = questionnaireData.questions.filter(
    (q) => q.included_in_scoring
  );
  let recalculateWeights = false;
  // Iterate through the included questions to adjust weights based on the answers
  includedQuestions.forEach((question) => {
    const answerIndex = responseData[question.code]?.answerIndexes[0];
    if (answerIndex !== undefined) {
      const answerData = question.answers[answerIndex];
      if (answerData.excluded_brands) {
        answerData.excluded_brands.forEach((excludedBrandId) => {
          const brand = supported_brands.find(
            (brand) => brand.form_id === excludedBrandId
          );
          if (brand) {
            brand.weight = 0; // Exclude the brand by setting its weight to 0
            brand.excluded = true; // Mark the brand as excluded
            recalculateWeights = true; 
          }
        });
      }
    }
  });
  //only if there is one excluded brand we need to make the other brands with equal distribution.
  if (recalculateWeights) {
    const remainingBrands = supported_brands.filter((brand) => !brand.excluded);
    const remainingBrandsCount = remainingBrands.length;
    // console.log("remainingBrands", remainingBrands);
    // If there are remaining brands, redistribute the weights equally
    if (remainingBrandsCount > 0) {
      const equalWeight = 1 / remainingBrandsCount;
      remainingBrands.forEach((brand) => {
        brand.weight = equalWeight;
      });
    }
  }
  // Prepare the data structure for weighted random selection
  const weightData = prepareWeightData(supported_brands);

  // Perform weighted random selection
  const chosenBrandId = weightedRandom(weightData);

  //   console.log("chosenBrandId", chosenBrandId);
  return chosenBrandId;
}
