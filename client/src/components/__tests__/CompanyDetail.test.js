import React from 'react'
// import { Home } from '../Home'
import { shallow, mount } from 'enzyme'
import { CompanyDetail } from '../CompanyDetail'

const getCompanyDetailById = jest.fn()
const getOhlcChart = jest.fn()

const company = [
  {
    sector: 'technology',
    industry: 'Computer',
    employees: '123456',
    profile: 'profile'
  }
]
const balancesheet = [{}]

const wrapper = shallow(
  <CompanyDetail
    getCompanyDetailById={getCompanyDetailById}
    company={company}
    match={{ params: { id: 1 } }}
    getOhlcChart={getOhlcChart}
  />
)

describe('Testing Company Detail Component', () => {
  //   afterEach(() => {
  //     jest.clearAllMocks()

  it('should mount the component', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should display the sector', () => {
    expect(wrapper.find('#company-detail-sector').text()).toBe('technology')
  })
  it('should display the industry', () => {
    expect(wrapper.find('#company-detail-industry').text()).toBe('computer')
  })
  it('should display the employees', () => {
    expect(wrapper.find('#company-detail-employees').text()).toBe('123456')
  })
  it('should display the profile', () => {
    expect(wrapper.find('#company-detail-profile').text()).toBe('profile')
  })
})
