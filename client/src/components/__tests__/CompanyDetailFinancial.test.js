import React from 'react'
// import { Home } from '../Home'
import { shallow, mount } from 'enzyme'
import { CompanyDetailFinancial } from '../CompanyDetailFinancial'

const getCompanyDetailById = jest.fn()

const company = [
  {
    sector: 'technology',
    industry: 'Computer',
    employees: '123456',
    profile: 'profile',
    cashequivalents:"123",
    currentassests:"123",
    totalassests:"123",
    accountpayable:"123",
    receivables:"123",
    totalliabilities:"123",
    currentliabilities:"123",
    preferredequity:"123",
    equitybeforeminorities:"123",
    minorityinterests:"123",
    noncurrentliabilities:"123",
    netincome:"123",
    revenues:"123",
    FOIT:"123",
    netprofit:"123",
    RandD:"123",
    incometax:"123",
    currentliabilities:"123",
    preferredequity:"123",
    equitybeforeminorities:"123",
    minorityinterests:"123",
    noncurrentliabilities:"123",
    netincome:"123",
    revenues:"123",
    FOIT:"123",
    netprofit:"123",
    RandD:"123",
    incometax:"123",
    currentliabilities:"123",
    preferredequity:"123",


  }
]

const wrapper = shallow(
  <CompanyDetailFinancial
    getCompanyDetailById={getCompanyDetailById}
    company={company}
    match={{ params: { id: 1 } }}
  />
)

describe('Testing Company Detail Financial Component', () => {
  //   afterEach(() => {
  //     jest.clearAllMocks()

  it('should mount the component', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should display the cash and cash equivalents', () => {
    expect(wrapper.find('#cashequivalents').text()).toBe('123')
  })
  it('should display the current assests', () => {
    expect(wrapper.find('#current-assests').text()).toBe('123')
  })
  it('should display the total assests', () => {
    expect(wrapper.find('#total-assests').text()).toBe('123')
  })
  it('should display the account payable', () => {
    expect(wrapper.find('#account-payable').text()).toBe('123')
  })
  it('should display the receivables', () => {
    expect(wrapper.find('#receivables').text()).toBe('123')
  })
  it('should display the total liabilities', () => {
    expect(wrapper.find('#total-liabilities').text()).toBe('123')
  })
  it('should display thecurrent liabilities', () => {
    expect(wrapper.find('#current-liabilities').text()).toBe('132')
  })
  it('should display the  preferred equity', () => {
    expect(wrapper.find('#preferred-equity').text()).toBe('123')
  })
  it('should display the equity before minorities', () => {
    expect(wrapper.find('#equity-before-minorities').text()).toBe('123')
  })
  it('should display the minority interests', () => {
    expect(wrapper.find('#minority-interests').text()).toBe('123')
  })
  it('should display the non current liabilities', () => {
    expect(wrapper.find('#non-current-liabilities').text()).toBe('123')
  })

  // testing for profit and loss
  it('should display the net income', () => {
    expect(wrapper.find('#net-income').text()).toBe('123')
  })
  it('should display the revenues', () => {
    expect(wrapper.find('#revenues').text()).toBe('123')
  })
  it('should display the FOIT', () => {
    expect(wrapper.find('#FOIT').text()).toBe('123')
  })
  it('should display the Net profit', () => {
    expect(wrapper.find('#net-profit').text()).toBe('123')
  })
  it('should display the R and D', () => {
    expect(wrapper.find('#RandD').text()).toBe('123')
  })
  it('should display the income tax', () => {
    expect(wrapper.find('#income-tax').text()).toBe('123')
  })
  it('should display thecurrent liabilities', () => {
    expect(wrapper.find('#current-liabilities').text()).toBe('123')
  })
  it('should display the  preferred equity', () => {
    expect(wrapper.find('#preferred-equity').text()).toBe('123')
  })
  it('should display the equity before minorities', () => {
    expect(wrapper.find('#quity-before-minorities').text()).toBe('123')
  })
  it('should display the minority interests', () => {
    expect(wrapper.find('#minority-interest').text()).toBe('123')
  })
  it('should display the non current liabilities', () => {
    expect(wrapper.find('#non-current-liabilities').text()).toBe('123')
  })

  // testing for cashflow

  it('should display the cash from operating activity', () => {
    expect(wrapper.find('#cash-op-activity').text()).toBe('123')
  })
  it('should display the  cash from investing activity', () => {
    expect(wrapper.find('#cash-ia').text()).toBe('123')
  })
  it('should display the  cash from financing activity', () => {
    expect(wrapper.find('#cash-fa').text()).toBe('123')
  })

  // testing for ratios
  it('should display the  liabilities to equity ratio.', () => {
    expect(wrapper.find('#l-e-ratio').text()).toBe('123')
  })
  it('should display the debt to assets ratio', () => {
    expect(wrapper.find('#d-a-ratio').text()).toBe('123')
  })
  it('should display the   current ratio', () => {
    expect(wrapper.find('#current-ratio').text()).toBe('123')
  })
})
