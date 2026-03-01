import { getRandomMockIdentification } from '@/constants/mockData';
import type { CarIdentification } from '@/types/api';
import { supabase } from '@/lib/supabase';

export function useCarIdentification() {
  /**
   * Week 1: returns mock data.
   * Week 2: wire up identifyCarFromBase64() from visionApi.ts.
   */
  const identify = async (base64: string): Promise<CarIdentification> => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1200));

    const mock = getRandomMockIdentification();

    // Try to look up the car in the DB to get the real car_id
    const { data: cars } = await supabase
      .from('cars')
      .select('id')
      .eq('make', mock.make)
      .eq('model', mock.model)
      .limit(1);

    return {
      ...mock,
      carId: cars?.[0]?.id,
    };
  };

  return { identify };
}
