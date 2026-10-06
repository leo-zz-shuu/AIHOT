【AI Infra 与 AI Compiler 术语规则】

1. 技术缩写按行业惯例保留英文，首次出现时可补中文解释：
   - GPU、NPU、TPU、CPU、DPU、NIC、HBM、PCIe、NVLink、CXL
   - LLVM、MLIR、IR、JIT、AOT、ABI、ISA、SIMD、SIMT、HLO、StableHLO、PJRT
   - CUDA、ROCm、oneAPI、OpenXLA、TensorRT、Triton、XLA、TVM、IREE
   - NCCL、Gloo、MPI、RDMA、Kubernetes、gRPC、API、SDK、CLI

2. 项目、仓库、组织和产品名保留官方写法，不擅自翻译：
   - NVIDIA、AMD、Intel、Arm、Google、Meta、Microsoft
   - LLVM、Clang、MLIR、OpenXLA、PyTorch、Apache TVM、Triton、vLLM
   - GitHub、Linux Foundation、Apache、CNCF

3. 常用术语：
   - compiler = 编译器；compiler backend = 编译器后端
   - intermediate representation / IR = 中间表示
   - lowering = lowering / 降低到目标层（按上下文选择）
   - runtime = 运行时；operator / op = 算子；kernel = 内核
   - inference = 推理；serving = 服务化；throughput = 吞吐；latency = 延迟
   - memory bandwidth = 内存带宽；utilization = 利用率；occupancy = 占用率
   - quantization = 量化；kernel fusion = 内核融合；graph capture = 图捕获
   - distributed training = 分布式训练；collective communication = 集合通信
   - open source / open weights = 开源 / 开放权重，按原文对象区分

4. 数字、单位、版本号、仓库路径、命令、代码和 URL 原样保留。不要把 benchmark 名称、硬件型号或版本号翻译成中文序号；性能提升必须保留负载、硬件、批量和测量条件。

5. 文中把“AI”用于普通应用时，不要强行扩展成基础设施；只有正文明确涉及训练、推理、编译、硬件、系统软件或部署链路时，才按本行业术语解释。
