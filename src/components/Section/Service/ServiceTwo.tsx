import React from 'react'
import ServiceItem from '../../Service/ServiceItem'
import { ServiceType } from '@/type/ServiceType'

interface Props {
    data: Array<ServiceType>
}

const ServiceTwo: React.FC<Props> = ({ data }) => {
    return (
        <>
            <section className="service-block lg:mt-[100px] sm:mt-16 mt-10">
                <div className="container items-center justify-center">
                    <div className="pl-[72px] w-full flex flex-col gap-4 flex-shrink-0">
                        <div className="text-sub-heading2 text-blue">Expertise</div>
                        <h3 className="heading3">A highly trusted wealth management firm</h3>
                        <div className="body3 text-secondary">We specialize in providing asset management services and solutions for individuals and organizations.</div>
                    </div>
                    <div className="w-full xl:pl-[72px] list-service grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 max-xl:mt-8">
                        {data.filter(item => item.category === 'financial planning').slice(0, 6).map((item, index) => (
                            <ServiceItem data={item} style='style-two' number={index} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceTwo