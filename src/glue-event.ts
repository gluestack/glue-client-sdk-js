const GlueEvent = (type: string, data?: any) => {
  return new CustomEvent(type, { detail: data ? data : null });
};

export default GlueEvent;
