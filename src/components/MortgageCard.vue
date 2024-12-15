<template>
  <div class="md:bg-slate-300 min-h-screen p-6 lg:p-36 flex justify-center items-center">
    <div class="relative bg-gray-100 h-fit w-[800px] grid grid-cols-1 md:grid-cols-2 md:rounded-2xl mb-6">
      <!-- left side -->
      <div>
        <!-- header -->
        <div class="md:flex justify-between p-6">
          <div>
            <h3 class="text-lg text-slate-900 font-bold">Mortgage Calculator</h3>
          </div>
          <div>
            <button @click="clearAll" type="button"
              class="text-sm text-slate-500 underline underline-offset-2 decoration-1">Clear
              All</button>
          </div>
        </div>
        <!-- end of header -->
        <!-- form -->
        <div class="px-6">
          <form @submit.prevent="calculateMortgage">
            <!-- mortgage amount -->
            <div class="">
              <div>
                <label for="" class="text-sm text-slate-500 font-medium">Mortgage Amount</label>
              </div>
              <div class="relative mt-2">
                <input type="text" v-model="formattedMortgageAmount" @input="updateMortgageAmount"
                  @focus="clientSideErrors.mortgageAmount = ''"
                  :style="{ borderColor: clientSideErrors.mortgageAmount ? '#d73328' : '' }"
                  class="peer font-semibold w-full px-14 py-2 outline-none border border-slate-300 rounded-md focus:ring-1 focus:ring-primary appearance-none">
                <span :class="{ 'text-white': clientSideErrors.mortgageAmount }"
                  :style="{ backgroundColor: clientSideErrors.mortgageAmount ? '#d73328' : '' }"
                  class="bg-slate-300 text-slate-500 font-bold absolute inset-y-0 left-0 px-4 flex items-center rounded-l-md peer-focus:bg-primary peer-focus:text-slate-900">
                  £
                </span>
              </div>
              <div>
                <p v-if="clientSideErrors.mortgageAmount" class="text-sm text-redColor mt-2">{{
                  clientSideErrors.mortgageAmount }}</p>
              </div>
            </div>
            <!-- end of mortgage amount -->
            <!-- mortgage term -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mt-4">
                <div>
                  <label for="" class="text-sm text-slate-500 font-medium">Mortgage Term</label>
                </div>
                <div class="relative mt-2">
                  <input type="number" v-model="loanTerm" @focus="clientSideErrors.loanTerm = ''" :style="{ borderColor: clientSideErrors.loanTerm ? '#d73328' : '' }"
                    class="peer font-semibold w-full px-4 py-2 outline-none border border-slate-300 rounded-md focus:ring-1 focus:ring-primary appearance-none">
                  <span :class="{ 'text-white': clientSideErrors.loanTerm }"
                    :style="{ backgroundColor: clientSideErrors.loanTerm ? '#d73328' : '' }"
                    class="bg-slate-300 text-sm text-slate-500 font-bold absolute inset-y-0 right-0 px-4 flex items-center rounded-r-md peer-focus:bg-primary peer-focus:text-slate-900">
                    Years
                  </span>
                </div>
                <div>
                  <p v-if="clientSideErrors.loanTerm" class="text-sm text-redColor mt-2">{{ clientSideErrors.loanTerm }}
                  </p>
                </div>
              </div>
              <div class="md:mt-4 mt-0">
                <div>
                  <label for="interest-rate" class="text-sm text-slate-500 font-medium">Interest Rate</label>
                </div>
                <div class="relative mt-2">
                  <input type="number" step="0.01" name="interest-rate" v-model="interestRate"
                    @focus="clientSideErrors.interestRate = ''" :style="{ borderColor: clientSideErrors.interestRate ? '#d73328' : '' }"
                    class="peer font-semibold w-full px-4 py-2 outline-none border border-slate-300 rounded-md focus:ring-1 focus:ring-primary appearance-none">
                  <span :class="{ 'text-white': clientSideErrors.interestRate }"
                    :style="{ background: clientSideErrors.interestRate ? '#d73328' : '' }"
                    class="bg-slate-300 text-slate-500 font-bold absolute inset-y-0 right-0 px-4 flex items-center rounded-r-md peer-focus:bg-primary peer-focus:text-slate-900">
                    %
                  </span>
                </div>
                <div>
                  <p v-if="clientSideErrors.interestRate" class="text-sm text-redColor mt-2">{{
                    clientSideErrors.interestRate }}</p>
                </div>
              </div>
            </div>
            <!-- end of mortgage term -->
            <!-- mortgage type -->
            <div class="mt-4">
              <div>
                <div>
                  <h3 class="text-sm text-slate-500 font-medium">Mortgage Type</h3>
                </div>
                <div class="mt-2 space-y-2">
                  <div
                    class="flex items-center ps-4 border-2 border-slate-300 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:bg-opacity-10 rounded-md cursor-pointer">
                    <input id="bordered-radio-1" type="radio" value="Repayment" name="mortgage-type"
                      v-model="mortgageType" @focus="clientSideErrors.mortgageType = ''"
                      class="w-4 h-4 accent-primary cursor-pointer">
                    <label for="bordered-radio-1"
                      class="w-full py-2 ms-2 font-bold text-slate-900 cursor-pointer">Repayment</label>
                  </div>
                  <div
                    class="flex items-center ps-4 border-2 border-slate-300 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:bg-opacity-10 rounded-md cursor-pointer">
                    <input id="bordered-radio-2" type="radio" value="Interest Only" name="mortgage-type"
                      v-model="mortgageType" @focus="clientSideErrors.mortgageType = ''"
                      class="w-4 h-4 accent-primary cursor-pointer">
                    <label for="bordered-radio-2"
                      class="w-full py-2 ms-2 font-bold text-slate-900 dark:text-gray-300 cursor-pointer">Interest
                      Only</label>
                  </div>
                </div>
                <div>
                  <p v-if="clientSideErrors.mortgageType" class="text-sm text-redColor mt-2">{{
                    clientSideErrors.mortgageType }}</p>
                </div>
              </div>
            </div>
            <!-- end of mortgage type -->
            <!-- button -->
            <div class="mb-6">
              <button type="submit"
                class="flex items-center w-full sm:w-fit justify-center mt-8 px-6 bg-primary text-slate-700 font-bold py-2 rounded-full hover:opacity-60"><span
                  class="mr-2"><img :src="calc_icon" alt="calculator icon"></span>Calculate
                Repayments</button>
            </div>
            <!-- end of button -->
          </form>
        </div>
        <!-- end of form -->
      </div>
      <!-- end of left side -->
      <!-- right side -->
      <!-- empty results start -->
      <div v-if="hideResults"
        class="p-6 bg-slate-700 md:rounded-bl-[60px] md:rounded-r-2xl flex flex-col items-center justify-center">
        <div>
          <img :src="icon" alt="icon" class="w-40">
        </div>
        <div class="text-center">
          <h3 class="text-lg text-white font-medium mb-2">Results shown here</h3>
          <p class="text-sm text-slate-400">Complete the form and click “calculate repayments” to see what
            your monthly repayments would be.
          </p>
        </div>
      </div>
      <!-- empty results end -->
      <!-- complete results start -->
      <div v-else class="p-6 bg-slate-700 md:rounded-bl-[60px] md:rounded-r-2xl">
        <div>
          <h3 class="text-lg text-white font-medium mb-2">Your results</h3>
          <p class="text-sm text-slate-400">Your results are shown below based on the information you provided. To
            adjust the results, edit
            the form and click “calculate repayments” again.</p>
        </div>
        <div class="bg-slate-900 border-t-4 border-primary p-6 mt-6 rounded-lg">
          <div class="space-y-3">
            <h3 class="text-sm text-slate-500">Your monthly repayments</h3>
            <p class="text-4xl text-primary font-bold">£{{ formartNumber(monthlyRepayment) }}</p>
            <div class="border-b border-slate-600 py-2"></div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-slate-500">Total you'll repay over the term</p>
            <p class="text-2xl text-white font-bold">£{{ formartNumber(totalPayment) }}</p>
          </div>
        </div>
      </div>
      <!-- complete results end -->
      <!-- end of right side -->
      <div class="attribution absolute -bottom-10 inset-x-0">
        <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href="https://robert-chunga.vercel.app/" target="_blank">Robert Chunga</a>.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import icon from '@/assets/images/illustration-empty.svg'
import calc_icon from '@/assets/images/icon-calculator.svg'

const mortgageAmount = ref('')
const interestRate = ref('')
const loanTerm = ref('')
const mortgageType = ref('')
const monthlyRepayment = ref('')
const totalPayment = ref('')

const hideResults = ref(true)

const clientSideErrors = ref({
  mortgageAmount: '',
  interestRate: '',
  loanTerm: '',
  mortgageType: ''
})

// Formats a number with commas as thousands separators.
const formartNumber = (number) => {
  if (isNaN(number)) {
    return ''
  }

  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')
}

// format numbers with commas
const formatNumber = (value) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Computed properties for formatted inputs
const formattedMortgageAmount = computed({
  get: () => formatNumber(mortgageAmount.value),
  set: (newValue) => {
    mortgageAmount.value = newValue.replace(/,/g, '')
  }
})

// update raw values
const updateMortgageAmount = (event) => {
  mortgageAmount.value = event.target.value.replace(/[^0-9]/g, '')
}

// Clears all form fields and resets the results.
const clearAll = () => {
  mortgageAmount.value = ''
  interestRate.value = ''
  loanTerm.value = ''
  monthlyRepayment.value = ''
  totalPayment.value = ''
  mortgageType.value = ''
  clientSideErrors.value = {}
  hideResults.value = true
}

// Calculates monthly repayment and total payment
const calculateMortgage = () => {
  clientSideErrors.value = {}

  if (!mortgageAmount.value || isNaN(mortgageAmount.value) || mortgageAmount.value <= 0) {
    clientSideErrors.value.mortgageAmount = 'This field is required'
  }

  if (!interestRate.value || isNaN(interestRate.value) || interestRate.value <= 0) {
    clientSideErrors.value.interestRate = 'This field is required'
  }

  if (!loanTerm.value || isNaN(loanTerm.value) || loanTerm.value <= 0) {
    clientSideErrors.value.loanTerm = 'This field is required'
  }

  if (!mortgageType.value || mortgageType.value === '') {
    clientSideErrors.value.mortgageType = 'This field is required'
  }

  if (Object.keys(clientSideErrors.value).length > 0) {
    return
  }

  const principal = parseFloat(mortgageAmount.value)
  const annualRate = parseFloat(interestRate.value) / 100
  const monthlyRate = annualRate / 12
  const totalMonths = parseInt(loanTerm.value) * 12

  // Calculate monthly repayment
  if (monthlyRate === 0) {
    monthlyRepayment.value = (principal / totalMonths).toFixed(2)
  } else {
    monthlyRepayment.value = ((principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)).toFixed(2)
  }

  // Calculate total interest
  totalPayment.value = (parseFloat(monthlyRepayment.value) * totalMonths).toFixed(2)

  // Display results
  hideResults.value = false
}
</script>

<style>
.attribution {
  font-size: 14px;
  text-align: center;
}

.attribution a {
  color: hsl(228, 45%, 44%);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* For Firefox */
}
</style>
