//mock api endpoint - Does not work for statically exported app. public/api/reporting-dates serves the static json file directly.
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ReportingDate } from '../../interfaces';
import MockData from '../../MockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportingDate[]>
) {
  res.status(200).json(MockData as ReportingDate[])
}
