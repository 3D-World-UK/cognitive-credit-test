//mock api endpoint
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ReportingDate } from '../../interfaces';
import MockData from '../../MockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportingDate[]>
) {
  res.status(200).json(MockData as ReportingDate[])
}
