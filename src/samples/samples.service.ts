import { SampleSchema, Sample } from "../models/sample.model";
class SamplesService {
  constructor() {}

  private async getLatestValue() {
    return Sample.findOne({}).sort({ timestamp: -1 }).exec();
  }

  private async getLastValues(numberOfSamplesToPull: number) {
    return Sample.find(
      {},
      {},
      {
        limit: numberOfSamplesToPull,
      }
    ).sort({ timestamp: -1 });
  }

  async aggregateLastValues(numberOfSamplesToPull: number) {
    const lastValues = await this.getLastValues(numberOfSamplesToPull);
    return (
      lastValues
        .map((doc) => doc.toJSON().value)
        .reduce((sum, current) => sum + current, 0) / lastValues.length
    );
  }
}

export default new SamplesService();
