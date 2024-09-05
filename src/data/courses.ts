// src/data/courses.ts

export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    originalPrice: string;
    discountedPrice: string;
    discountPercentage: number;
    rating: number;
    ratingCount: number;
    studentsEnrolled: number;
    isUpdated: boolean;
    imageUrl: string;
  }
  
  export const courses: Course[] = [
    {
      id: 1,
      title: '네트워크 패킷 분석 입문 및 악성코드 샘플 분석',
      description: '보안프로젝트',
      instructor: '보안프로젝트',
      originalPrice: '₩132,000',
      discountedPrice: '₩99,000',
      discountPercentage: 25,
      rating: 4.5,
      ratingCount: 101,
      studentsEnrolled: 900,
      isUpdated: true,
      imageUrl: '/images/github.png',
    },
    {
      id: 2,
      title: '10주 완성 C++ 코딩테스트 | 알고리즘 코딩테스트',
      description: '큰돌',
      instructor: '큰돌',
      originalPrice: '₩165,000',
      discountedPrice: '₩123,750',
      discountPercentage: 25,
      rating: 4.8,
      ratingCount: 225,
      studentsEnrolled: 3500,
      isUpdated: true,
      imageUrl: '/images/github.png',
    },
    {
      id: 3,
      title: 'CS 지식의 정석 | 디자인패턴 네트워크 운영체제 데이터베이스 자료구조',
      description: '큰돌',
      instructor: '큰돌',
      originalPrice: '₩165,000',
      discountedPrice: '₩132,000',
      discountPercentage: 20,
      rating: 4.7,
      ratingCount: 179,
      studentsEnrolled: 3100,
      isUpdated: true,
      imageUrl: '/images/github.png',
    },
    {
      id: 4,
      title: '[개정3판] Node.js 교과서 - 기본부터 프로젝트 실습까지',
      description: '제로초(조현영)',
      instructor: '제로초(조현영)',
      originalPrice: '',
      discountedPrice: '₩132,000',
      discountPercentage: 0,
      rating: 4.6,
      ratingCount: 38,
      studentsEnrolled: 1600,
      isUpdated: false,
      imageUrl: '/images/github.png',
    },
    {
      id: 5,
      title: '2주만에 통과하는 알고리즘 코딩테스트 (2024년)',
      description: '코딩 센세',
      instructor: '코딩 센세',
      originalPrice: '₩33,000',
      discountedPrice: '₩24,750',
      discountPercentage: 25,
      rating: 4.9,
      ratingCount: 46,
      studentsEnrolled: 1400,
      isUpdated: true,
      imageUrl: '/images/github.png',
    },
  ];
  