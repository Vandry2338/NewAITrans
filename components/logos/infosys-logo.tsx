const infosysConsultingLogoPath = "/assets/Infosys_Consulting-Logo.wine_1752461972874.png";

interface InfosysLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function InfosysLogo({ className = "", width = 450, height = 120 }: InfosysLogoProps) {
  return (
    <div className={className} style={{ width: width, height: height }}>
      <img 
        src={infosysConsultingLogoPath}
        alt="Infosys Consulting"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain'
        }}
      />
    </div>
  );
}